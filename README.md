# iLabel

iLabel is a image storage and identification web application that users can upload/store images and automically generates appropriate labels based on the image.

It uses the AWS technolgies such as Rekognition, EC2, RDS, and S3. Rekognition was used for generating labels for each image. EC2 was used to deploy the application with Nginx. RDS served Postgres database. S3 was used to store images. VPC consists of private and public subnets where the EC2 instance located in public subnet while the database was located in private subnets to keep it accessible from outside.

A full stack application built in React, Django, and Postgres by Dongxuan Li.

![iLabel_Demo](https://github.com/dongxli/iLabel_Full/blob/master/Demo/iLabel_Demo.gif)
