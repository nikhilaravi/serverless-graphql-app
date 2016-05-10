bucket="serverless-ui-demo"
dir="public/graphiql"
for f in "$dir"/*; do
  IFS='/' read -r -a names <<< "$f"
  echo "${names[2]}"
  aws s3api put-object \
    --acl "public-read" \
    --bucket "$bucket" \
    --key "graphiql/${names[2]}" \
    --body "$f" \
    --content-type "text/html"
done
