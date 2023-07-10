FROM node:18 AS BASE

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

RUN npm i -g pnpm

FROM base AS dependencies

RUN openssl version -v
RUN uname -a
RUN echo $DATABASE_URL

# Create app directory
WORKDIR /app

# Install prisma for the migration
RUN pnpm install --global prisma --unsafe-perm

# Copy schema and migration folder
ADD ./ ./prisma/

CMD [ "prisma", "migrate", "dev", "--skip-generate"]
