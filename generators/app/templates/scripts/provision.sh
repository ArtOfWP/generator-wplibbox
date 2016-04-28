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
else
    sudo ln -sf "${cache_file}" "${cache_link}"
fi
echo "Creating sites"
while read -r host
do
  host=${host/./-}
#  mkdir -p "/var/www/${host}/content"
#  mkdir -p "/var/www/${host}/content/plugins"
#  mkdir -p "/var/www/${host}/content/themes"
#  mkdir -p "/var/www/${host}/content/mu-plugins"
  host=${host/-/_}
  mysql -u root -e "CREATE DATABASE IF NOT EXISTS ${host}"
  mysql -u root -e "GRANT ALL PRIVILEGES ON ${host}.* TO wordpress@localhost IDENTIFIED BY 'wordpress';"
  mysql -u root ${host} < /vagrant/sql/default.sql
done < '/var/www/.hosts'
