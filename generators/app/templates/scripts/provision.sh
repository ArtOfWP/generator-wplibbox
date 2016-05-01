#!/usr/bin/env bash
#
# WPLib Box provision script
#

#
# Import default database from /sql/default.sql
#

mysql -u root wordpress < /vagrant/sql/default.sql

#
# Symlink the Object Cache Drop-in for Redis, if not already symlinked
#
content_dir="/var/www/content"
cache_file="${content_dir}/mu-plugins/wp-redis/object-cache.php"
cache_link="${content_dir}/object-cache.php"
if [ ! -f "${cache_file}" ]; then
    echo "ERROR: Composer not run before Vagrant. Please run these two (2) commands:"
    echo " "
    echo "      composer install"
    echo "      vagrant reload --provision"
    echo " "
fi

echo "Creating sites"
while read -r host
do
  if [ ! -z "$host" ]; then
    host=${host/./-}
    echo "Creating ${host} folders"
    mkdir -p "/var/www/${host}/content"
    mkdir -p "/var/www/${host}/content/plugins"
    mkdir -p "/var/www/${host}/content/themes"
    mkdir -p "/var/www/${host}/content/mu-plugins"
    sudo ln -sf "/var/www/wp" "/var/www/${host}"
    sudo ln -sf "${cache_file}" "/var/www/${host}/content/"
    host=${host/-/_}
    echo "Creating ${host} database"
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS ${host}"
    mysql -u root -e "GRANT ALL PRIVILEGES ON ${host}.* TO wordpress@localhost IDENTIFIED BY 'wordpress';"
    mysql -u root ${host} < /vagrant/sql/default.sql
  fi
done < '/var/www/.hosts'
