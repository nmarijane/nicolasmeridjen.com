#!/usr/bin/env python3
"""GitHub webhook receiver — auto-rebuild blog on push to main."""

import hashlib
import hmac
import json
import logging
import subprocess
import threading
from pathlib import Path

from flask import Flask, Response, jsonify, request

app = Flask(__name__)
logger = logging.getLogger("deploy-webhook")
logging.basicConfig(level=logging.INFO)

REPO_PATH = Path("/root/repos/nicolasmeridjen.com")
COMPOSE_PATH = Path("/data/coolify/services/gca26w5c0fpgrzid7gtkbnau")
SECRET = "12cf5ea78ebb45a94da4a0b0d13df0cb534184fe"
IMAGE_NAME = "nicolasmeridjencom-blog:latest"
CONTAINER_NAME = "blog-gca26w5c0fpgrzid7gtkbnau"

_deploying = False


def verify_signature(payload: bytes, signature: str) -> bool:
    if not signature.startswith("sha256="):
        return False
    expected = hmac.new(SECRET.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)


def deploy():
    global _deploying
    if _deploying:
        logger.info("Deploy already in progress, skipping")
        return
    _deploying = True
    try:
        logger.info("Starting deploy...")

        # Pull latest
        subprocess.run(["git", "pull", "origin", "main"], cwd=REPO_PATH, check=True, timeout=60)
        logger.info("Git pull done")

        # Build image
        subprocess.run(
            ["docker", "build", "-t", IMAGE_NAME, "."],
            cwd=REPO_PATH, check=True, timeout=300,
        )
        logger.info("Docker build done")

        # Restart container
        subprocess.run(["docker", "stop", CONTAINER_NAME], timeout=30)
        subprocess.run(["docker", "rm", CONTAINER_NAME], timeout=10)
        subprocess.run(
            ["docker", "compose", "up", "-d"],
            cwd=COMPOSE_PATH, check=True, timeout=60,
        )
        logger.info("Deploy complete!")

    except Exception as e:
        logger.error("Deploy failed: %s", e)
    finally:
        _deploying = False


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/webhook/blog", methods=["POST"])
def webhook():
    signature = request.headers.get("X-Hub-Signature-256", "")
    payload = request.get_data()

    if not verify_signature(payload, signature):
        return jsonify({"error": "unauthorized"}), 401

    body = request.get_json(silent=True) or {}

    # Only deploy on push to main
    if body.get("ref") != "refs/heads/main":
        return jsonify({"status": "ignored", "reason": "not main branch"})

    logger.info("Push to main detected, triggering deploy")
    threading.Thread(target=deploy, daemon=True).start()

    return jsonify({"status": "deploying"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9876)
