case "$MYSQL_AURA_PASSWORD" in
  *[!a-zA-Z0-9]*|"") echo "MYSQL_AURA_PASSWORD debe ser alfanumérica"; return 1 ;;
esac
for servicio in usuarios tratamientos profesionales agenda reservas; do
  docker_process_sql <<SQL
CREATE DATABASE IF NOT EXISTS aura_${servicio} CHARACTER SET utf8mb4;
CREATE USER IF NOT EXISTS 'aura_${servicio}'@'%' IDENTIFIED BY '${MYSQL_AURA_PASSWORD}';
GRANT ALL PRIVILEGES ON aura_${servicio}.* TO 'aura_${servicio}'@'%';
SQL
done
