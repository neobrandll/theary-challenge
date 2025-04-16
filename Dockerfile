FROM node:18

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start:prod"]
