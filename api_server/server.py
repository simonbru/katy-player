#!/usr/bin/env python3

import urllib

from bottle import Bottle, request
from youtube_dl import YoutubeDL


app = Bottle()


@app.route('/info/<url:path>')
def v_dash_aac128(url):
    url = urllib.parse.unquote(url)  # workaround
    format = request.forms.get('format', 'best')
    ytdl = YoutubeDL({'format': format})
    info = ytdl.extract_info(url, download=False)
    return info


@app.route('/info/<vid>')
def v_dash_aac128_vid(vid):
    v_dash_aac128("https://youtube.com/?v="+vid)


app.run(host='0.0.0.0', reloader=True, debug=True, server='cherrypy', port=3001)
