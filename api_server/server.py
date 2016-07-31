#!/usr/bin/env python3

import urllib

from bottle import Bottle, request, response
from youtube_dl import YoutubeDL


app = Bottle()


@app.route('/info/<url:path>')
def v_info_url(url):
    url = urllib.parse.unquote(url)  # workaround
    format = request.forms.get('format', 'best')
    ytdl = YoutubeDL({'format': format, 'source_address': '0.0.0.0'})
    info = ytdl.extract_info(url, download=False)

    response.set_header('Access-Control-Allow-Origin', '*')
    return info


@app.route('/info/<vid>')
def v_info_vid(vid):
    v_info_url("https://youtube.com/?v="+vid)


app.run(host='0.0.0.0', reloader=True, debug=True, server='cherrypy', port=3001)
