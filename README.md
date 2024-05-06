# AWS-S3-OPERATIONS

### Download S3 object
**Usage**
#### Make sure to add the below environmental variables in .env file
1. AWS_ACCESS_KEY,
2. AWS_SECRET_ACCESS_KEY,
3. AWS_REGION,
4. AWS_BUCKET_NAME

```
const { downloadS3Object } = require('aws-s3-operations');
const {
    AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME,
    AWS_REGION
} = process.env
downloadS3Object(
    <Aws file link to download>,
    AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_BUCKET_NAME
)
```

The file will get download in the root directory with the filename in the given `aws file link`

