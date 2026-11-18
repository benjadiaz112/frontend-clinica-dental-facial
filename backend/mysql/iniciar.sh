for servicio in usuarios tratamientos profesionales agenda reservas; do
  docker_process_sql <<SQL
CREATE DATABASE IF NOT EXISTS aura_${servicio} CHARACTER SET utf8mb4;
SQL
done
