###################
# DEVELOPMENT
###################

FROM node:16.13.2-alpine As development

WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install dependencies
RUN npm install --force

# Generate Prisma database client code
RUN npm run prisma:generate

# Run the build command which creates the production bundle
RUN npm run build


###################
# PRODUCTION
###################

FROM node:16.13.2-alpine As production

# Set NODE_ENV environment variable
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY . .

# Passing in --only=production ensures that only the production dependencies are installed.
RUN npm install --only=production --force

RUN npm run prisma:generate

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
