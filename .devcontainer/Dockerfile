# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends ffmpeg  haskell-stack build-essential gettext \
		&& stack upgrade --binary-only \
		&& apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /root/.gnupg /tmp/library-scripts

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
RUN su node -c "npm install -g nodemon"

# Use Hadolint
# USER node
# RUN export LANG=C.UTF-8 && export LC_ALL=C.UTF-8 && export LANGUAGE=C.UTF-8 \
# 	&& cd /home/node \
#   && git clone https://github.com/hadolint/hadolint --depth=1 \
# 	&& cd hadolint \
# 	&& stack install \
# 	&& cd ../ \
# 	&& rm -rf hadolint \
# 	&& sudo apt-get purge -y haskell-stack
