#!/usr/bin/env bash
#
# WPLib Box provision script
#

#
# Import default database from /sql/default.sql
#

#mysql -u root wordpress < /vagrant/sql/default.sql

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
    host_folder=${host//./-}
    echo "Creating ${host} folders"
    mkdir -p "/var/www/${host_folder}/content"
    mkdir -p "/var/www/${host_folder}/content/plugins"
    mkdir -p "/var/www/${host_folder}/content/themes"
    mkdir -p "/var/www/${host_folder}/content/mu-plugins"
    sudo ln -sf "/var/www/wp" "/var/www/${host_folder}"
    sudo ln -sf "${cache_file}" "/var/www/${host_folder}/content/object-cache.php"
    host_db=${host//-/_}
    host_db=${host_db//./_}
    echo "Creating ${host} database"
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS ${host_db}"
    mysql -u root -e "GRANT ALL PRIVILEGES ON ${host_db}.* TO wordpress@localhost IDENTIFIED BY 'wordpress';"
    mysql -u root ${host_db} < /vagrant/sql/default.sql
    site_provision_script="/var/www/${host_folder}/site_provision.sh"
    if [ -f "${site_provision_script}" ]; then
      chmod +x "${site_provision_script}"
      source "${site_provision_script}"
    fi
  fi
done < '/var/www/.hosts'