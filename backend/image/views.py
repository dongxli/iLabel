from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from PIL import Image
import boto3
import os
import io
from .serializers import ImageSerializer    
from django.shortcuts import redirect
from .models import Image as IM
from . import config

class ImageView(APIView):
    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request):

        # post data with description and image
        description = request.POST['description']
        image = Image.open(request.FILES['image'])

        # prefix/directory for the images
        prefix = "images/"
        key = prefix + os.urandom(8).hex() + ".png"

        # save into memory as PNG
        buffer = io.BytesIO()
        image.save(buffer, "PNG")
        buffer.seek(0)

        # access s3 and rekognition
        s3_client = boto3.client('s3',
            aws_access_key_id=config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=config.AWS_SECRET_ACCESS_KEY)
        rek = boto3.client('rekognition', config.REKOGNITION_REGION,
            aws_access_key_id=config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=config.AWS_SECRET_ACCESS_KEY)

        # store image in s3
        s3_client.put_object(
            Bucket=config.S3_BUCKET_NAME,
            Key=key,
            Body=buffer,
            ContentType='image/png'
        )

        # get labels for the image from rekognition
        response_labels = rek.detect_labels(
            Image={
                'S3Object': {
                    'Bucket': config.S3_BUCKET_NAME,
                    'Name': key
                }
            })

        # get the labels and join into comma separated 
        labels = [label['Name'] for label in response_labels['Labels']]
        comma_separated_labels = ", ".join(labels)
        

        # image_url = s3_client.generate_presigned_url(
        #         'get_object',
        #         Params={'Bucket': config.S3_BUCKET_NAME, 'Key': key})   

        # create/save image details in database
        image_saving = IM(key=key, labels=comma_separated_labels,description=description,username="temp")
        image_saving.save()

        return Response({"key": key, "labels": comma_separated_labels})

    def get(self,request):

        # get all images 
        all_images = IM.objects.all()
        serializer = ImageSerializer(all_images, many=True)
        
        return Response({"image_details": serializer.data})

        # return Response({"data": all_images})

    # def delete(self, request):

