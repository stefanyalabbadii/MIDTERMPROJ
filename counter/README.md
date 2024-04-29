```
gcloud functions deploy countFiles \
    --runtime nodejs20 \
    --trigger-http \
    --allow-unauthenticated \
    --entry-point countFiles \
    --source=./ \
    --region=us-central1


```