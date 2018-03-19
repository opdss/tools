<?php
/**
 * Created by PhpStorm.
 * User: wuxin
 * Date: 2018/3/20
 * Time: 00:53
 */
namespace App\Api;

use Slim\Http\Request;
use Slim\Http\Response;

class Cryption
{
    /**
     * @pattern /api/des[/]
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function des(Request $request, Response $response, $args)
    {
        $mode = $request->getParam('mode');
        $pad = $request->getParam('pad');
        $password = $request->getParam('password');
        $iv = $request->getParam('iv');
        $out = $request->getParam('out');
        $data = $request->getParam('data');
        $charset = $request->getParam('charset');
    }

    /**
     * @pattern /api/aes[/]
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function aes(Request $request, Response $response, $args)
    {
        $mode = $request->getParam('mode');
        $pad = $request->getParam('pad');
        $block = $request->getParam('block');
        $password = $request->getParam('password');
        $iv = $request->getParam('iv');
        $out = $request->getParam('out');
        $data = $request->getParam('data');
        $charset = $request->getParam('charset');
    }

    /**
     * @pattern /api/rsa[/]
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function rsa(Request $request, Response $response, $args)
    {
        $type = $request->getParam('type');
        $pad = $request->getParam('pad');
        $charset = $request->getParam('charset');
        $key = $request->getParam('key');
        $password = $request->getParam('password');
        $data = $request->getParam('data');
    }
}