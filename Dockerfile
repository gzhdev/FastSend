# 构建阶段
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable && yarn install --immutable

COPY . .
ENV NODE_OPTIONS=--max-old-space-size=6144
RUN yarn build

# 运行阶段
FROM node:24-alpine

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

COPY --from=builder /app/.output /app

# 传输计数文件写在工作目录，单独挂卷保存
RUN mkdir -p /data && chown node:node /data
WORKDIR /data
USER node

EXPOSE 3000

CMD ["node", "/app/server/index.mjs"]
