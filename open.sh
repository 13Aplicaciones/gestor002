cd configuracion/Portal/
docker compose up -d
cd ../..

cd configuracion/Kafka/
docker compose up -d
cd ../..

cd backend/
code backend.code-workspace &

cd ..
cd frontend/
code frontend.code-workspace &


