bucket="gql-v1"
region="eu-west-1"

aws s3api create-bucket \
  --bucket "$bucket" \
  --region "$region" \
  --acl "public-read" \

aws s3api put-bucket-policy \
  --bucket "$bucket" \
  --policy '{
    "Version":"2012-10-17",
    "Statement":[{
  	"Sid":"PublicReadGetObject",
          "Effect":"Allow",
  	  "Principal": "*",
        "Action":["s3:GetObject"],
        "Resource":["arn:aws:s3:::gql-v1/*"
        ]
      }
    ]
  }'

aws s3 website "s3://$bucket/" \
  --index-document index.html
