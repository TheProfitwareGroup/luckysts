#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = 'Sergey Sobko'
__email__ = 'S.Sobko@profitware.ru'
__copyright__ = 'Copyright 2013, The Profitware Group'

from datetime import datetime
from os import environ

from urlparse import urlparse

from flask import Flask, render_template, jsonify, request
from pymongo import Connection


MONGO_URL = environ.get('MONGOHQ_URL')

EXTJS_CDN_JS = 'https://cdnjs.cloudflare.com/ajax/libs/extjs/4.2.1/ext-all.js'
EXTJS_CDN_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/extjs/4.2.1/resources/css/ext-all.css'


if MONGO_URL:
    connection = Connection(MONGO_URL)
    db = connection[urlparse(MONGO_URL).path[1:]]
else:
    connection = Connection('localhost', 27017)
    db = connection['luckysts']

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/admin/')
@app.route('/admin/<page_name>')
def admin(page_name='dictionary'):
    if page_name in ('dictionary',):
        return render_template('admin.html', extjs_js=EXTJS_CDN_JS, extjs_css=EXTJS_CDN_CSS)
    return render_template('404.html'), 404

@app.route('/v1/terms/')
def terms():
    last_update = None
    if 'last_update' in request.args:
        try:
            last_update = datetime.strptime(request.args['last_update'], '%Y%m%d%H%M')
        except ValueError:
            pass
    if last_update is not None:
        terms_iter = db.terms.find({'last_update': {'$gt': last_update}})
    else:
        terms_iter = db.terms.find()
    terms_list = list()
    for term in terms_iter:
        terms_list.append({
            'name': term.get('name'),
            'description': term.get('description'),
            'last_update': term.get('last_update')
        })
    return jsonify(**{'terms': terms_list})


if __name__ == '__main__':
    app.run(debug=True)
