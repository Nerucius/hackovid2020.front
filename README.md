# Platform Web Application

`TODO: adapt to final specs`

## Architecture Overview

The host's apache acts as an **SSL termination**, and all intra-host communication is performed safe from outside interference and with unencrypted HTTP sockets.

All configuration parameters can be adapted using the provided `.env.sample file`.

# Deployment Instructions

## Step by Step

To deploy the platform to a new server, first make sure you have installed all of the required software in the section `Required software on Host`.

1. Clone the repository to a folder. It is suggested to use `/opt/docker/<folder>` for this purpose.
1. Copy the `.env.sample` file at the root of the folder to `.env`. Ignore other `.env.sample` files inside the `django` and `vuetify` folders.
1. Configure the new `.env` file to your needs.
1. Create a new Apache2 VirtualHost using the `apache.vhost.conf` file in the root folder. Configure this host with proper SSL certificates and adapt to your needs. Make sure the domains and ports in the virtualhost configuration match with the `.env` file you previously configured.
1. Restart Apache2 if you haven't done so yet.
1. Open port `80` and `443` on the server's firewall.
1. At the root folder. run the command `docker-compose up`
1. All docker containers should spin up and open their configured ports internally to the machine.
1. The setup is complete.

### Required software on Host

1. Docker-CE
2. Apache2 (mod_headers + mod_ssl + mod_rewrite)

HTTPS Certificates can be obtained throuh letsencrypt `certbot-auto` software.

## Development Instructions

### For frontend development

**Requirements**
- NodeJS 10 LTS

**Setup steps**
1. Open `vuetify` folder in VSCode.
1. Copy `.env.sample` to `.env`
1. Edit values in `.env` file to point to a remote server
    that is running the backend.
1. Run `npm run serve` to start the local testing environment in order
    to start development of the frontend. HMR is setup so there is no
    need to refresh the browser on code changes.
