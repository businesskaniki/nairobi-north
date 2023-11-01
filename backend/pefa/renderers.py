"""
Module: custom_renderer

This module defines a custom renderer class for serializing responses in a specific format using the Django REST framework.
"""

from rest_framework import renderers
import json

class UserRenderer(renderers.JSONRenderer):
    """
    Custom JSONRenderer for user responses.

    This renderer converts data into JSON format and handles different response formats based on the data provided.
    """

    charset = 'utf-8'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        """
        Render the response data into JSON format.

        :param data: The data to be serialized.
        :param accepted_media_type: The media type accepted for the response.
        :param renderer_context: Context information about the renderer.
        :return: JSON representation of the data.
        """
        response = ''
        if 'ErrorDetail' in str(data):
            response = json.dumps({'errors': data})
        else:
            response = json.dumps({'data': data})
        return response
