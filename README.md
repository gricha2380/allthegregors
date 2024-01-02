# All The Gregors
A small showcase for the various avatars I've made over the years. Data is pulled dynamically from a DynamoDB database, and retrieved through an API Gateway endpoint. Site is hosted serverlessly through S3, and SSL provided through CloudFront.

# Update process
* Add div in `index.html`.
* Position group photo in `main.scss`.
* Run `num run db_new_year` to duplicate `entry_template.json`. Add description into new file then run `npm run db_update` to update the db table.
* Deploy frontend changes: `npm run deploynow`.