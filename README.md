# freshdesk-pip

Freshdesk Authentication proxy for AAF.

## Overview

Provides authentication integration between Freshdesk and AAF. Authorization is happens at
Freshdesk.

## Architecture

The application is written in SailsJS (NodeJS) backed by a MongoDB backend. It is stateless, i.e. it
doesn't maintain HTTP sessions. The MongoDB is only required to validate JTI uniqueness as required
by AAF. The application persists the JTI on each successful login.

Tested with:

 * Node 0.12.7
 * Sails 0.11.3
 * Openstack (client) 1.6.0
 * Nova (client) 2.26.0

## Configuration

Freshdesk needs to be configured:

Under 'General Settings' -> 'Security' -> 'Single Sign On (SSO)' -> 'Simple SSO':
  - Remote login URL: https://*fqdn*/pip/aaf/login

The application requires a Freshdesk secret key, which is found at:
'General Settings' -> 'Security' -> 'Single Sign On (SSO)' -> 'Simple SSO' -> 'Shared Secret'.
Please see Freshdesk documentation for more information. To use this key, see *puppet-freshdesk*
documentation.

## Packaging

To simplify deployment of the application on the production and test environments which have limited
internet connectivity, versioned bundles of this application are stored at *puppet-freshdesk/bin*.

To package a bundle, simply run `npm install` and then create a tar ball of this app with the naming
convention 'freshdesk-pip-*version*.tar.gz' and put at *puppet-freshdesk/bin/*. Don't forget the
appropriate tags on the concerned repositories.

## Service information

Service name: freshdesk-pip
Configuration: /opt/freshdesk-pip/config/env/*environment*.js
Log file: /var/log/freshdesk/pip.log
Logrotate config: /etc/logrotate.d/freshdesk

## Linting and Testing

To set up and execute the test suite: `npm install && npm test`. You may drop the `npm install`
command to just execute the test.