# Serverless GraphQL Jukebox
Front end and GraphiQL IDE for serverless graphql jukebox app.

***The code for the creation of a lambda function and api gateway endpoint can be found here [https://github.com/nikhilaravi/serverless-graphql](https://github.com/nikhilaravi/serverless-graphql)
Follow the steps to create the api and lambda first!! You'll need an api invoke url in order to deploy the UI.***

**Demo app:** [http://demo-v1.s3-website-us-east-1.amazonaws.com/app/](http://demo-v1.s3-website-us-east-1.amazonaws.com/app/)

**Demo GraphiQL:** [http://demo-v1.s3-website-us-east-1.amazonaws.com/graphiql/](http://demo-v1.s3-website-us-east-1.amazonaws.com/graphiql/)

To try out GraphiQL paste this query into the query editor
```
query($query: String) {
  suggestions(query: $query) {
    name,
    artist,
    url,
    imageUrl
  }
}
```
and paste this into the query variables editor on the bottom left of the screen.
```
{
  "query": "name of a song"
}
```
Then hit the 'play' button!

## Technologies
- AWS s3 - host a static website for the UI
- GraphiQL - IDE to inspect and query a GraphQl schema
- React
- Babel
- Webpack

## Before you start export your environment variables
```sh
export AWS_ACCESS_KEY_ID='yourkey'
export AWS_ACCESS_KEY_SECRET='yoursecretkey'
export AWS_REGION='region'
```
## 1. Create an S3 bucket and enable static website hosting

Set the name of the bucket in the `./scripts/s3-create-app.sh` file as well as in the `./scripts/s3-update-app.sh` and `./scripts/s3-update-graphiql.sh`

Create the bucket by typing the command:

```sh
npm run create-s3
```

## 2. Add the api invoke url to config.js

This the url that will be used to invoke the API gateway endpoint to trigger the GraphQL lambda function

## 3. Check everything works by running locally

The app and GraphiQL can be run individually using

```sh
npm run app:serve
```
or

```sh
npm run graphiql:serve
```

## 4. Deploy to S3

To deploy both the App and Graphiql use the command:

```sh
npm run deploy:ui
```

or to deploy each separately use:

```sh
npm run deploy:app
```

or

```sh
npm run deploy:graphiql
```

## View the website!

Great your app is now live!

To view the app visit the url: `http://bucketname.s3-website-eu-west-1.amazonaws.com/` **Swap bucketname for the name of your bucket!!!***

Add `/app` at the end of the url to view the app or `/graphiql` to view GraphiQL.
