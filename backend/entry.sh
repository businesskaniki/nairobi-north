#!/bin/sh

python manage.py makemigrations pefa
python manage.py migrate --no-input
python Admin.py
python manage.py collectstatic --no-input

gunicorn core.wsgi:application --bind 0.0.0.0:8000
