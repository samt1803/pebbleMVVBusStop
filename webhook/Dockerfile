FROM arm32v7/node

WORKDIR /app
COPY . .

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

RUN npm install --prod

EXPOSE 23432
CMD ["node", "parse.js"]