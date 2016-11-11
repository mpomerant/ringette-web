#!/usr/bin/env bash
docker-compose -f docker-compose-cucumber.yml up -d frontend component-server selenium-ff selenium-ch 
