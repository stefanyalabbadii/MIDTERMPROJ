```
gcloud functions deploy classifyAndMoveFile \
    --runtime nodejs20 \
    --trigger-resource midterm-upload-pdfs \
    --trigger-event google.storage.object.finalize \
    --entry-point classifyAndMoveFile \
    --source=./ \
    --region=us-central1


```