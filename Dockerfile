FROM node:lts-alpine as builder

WORKDIR /app

COPY . .
RUN set -xe \
  && node -v \
  && npm install -g pnpm \
  && pnpm install \
  && pnpm build

# 运行环境
FROM caddy:2-alpine

ENV TZ Asia/Shanghai

RUN set -xe \
  && apk -U upgrade \
  && apk add --update --no-cache --virtual .build-deps \
  tzdata \
  && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
  # 删除不必要的东西
  && apk del .build-deps \
  && rm -rf /tmp/*

COPY --from=builder /app/dist /var/www/html

ADD ./Caddyfile /etc/caddy/Caddyfile

RUN /usr/bin/caddy fmt --overwrite /etc/caddy/Caddyfile

EXPOSE 80