#!/usr/bin/env python3

import os
import urllib
from pathlib import Path
from sys import stderr
from subprocess import Popen, PIPE

from bottle import Bottle, redirect, request, response, static_file
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


@app.route('/test/<abcd>')
def test(abcd):
    return static_file('0KSOMA3QBU0.mp4', root='/home/simon/Dev/katy-player/cache/')


@app.route('/dl/<vid>')
def v_dl_vid(vid):
    # return static_file('0KSOMA3QBU0.mp4', root='/home/simon/Dev/katy-player/cache/')
    cache_dir = Path(os.environ['CACHE_DIR'])
    vid_path = cache_dir.joinpath(vid + '.mp4')
    if vid_path.exists():
        redirect('/cache/' + vid_path.name)
    else:
        print(vid_path.as_posix(), 'doesnt exist')
        yield from download_vid(vid)


@app.route('/cache/<url:path>')
def v_cache(url):
    # cache_dir = Path(os.environ['CACHE_DIR'])
    cache_dir = os.environ['CACHE_DIR']
    return static_file(url, cache_dir)


def download_vid(vid):
    args = ['python3', '-m', 'youtube_dl', '-f', 'best', '-o', '-', '--', vid]
    with Popen(args, bufsize=-1, stdout=PIPE, stderr=stderr) as ps:
        response.content_length = '71303168'
        response.content_type = "video/mp4"
        for chunk in ps.stdout:
            yield chunk

#
# @app.route('/dl/<url:path>')
# def v_dl_url(url):
#     url = urllib.parse.unquote(url)  # workaround
#     args = ['python3', '-m', 'youtube_dl', '-f', 'best', '-o', '-', '--', url]
#     with Popen(args, bufsize=-1, stdout=PIPE, stderr=stderr) as ps:
#         response.content_length = '71303168'
#         response.content_type = "video/mp4"
#         for chunk in ps.stdout:
#             yield chunk





app.run(host='0.0.0.0', reloader=True, debug=True, server='cherrypy', port=os.environ.get('PORT', 3001))
