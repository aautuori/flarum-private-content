<?php

namespace acme\privatecontent;

use Flarum\Extend;
use Flarum\Formatter\Event\ConfigureFormatter;
use s9e\TextFormatter\Configurator;

return (new Extend\Frontend('forum'))
    ->js(__DIR__ . '/js/dist/forum.js')
    ->css(__DIR__ . '/less/forum.less')
    ->extend(new Extend\Formatter())
    ->configure(function (Configurator $config) {
        $config->BBCodes->addCustom(
            '[private]{TEXT}[/private]',
            '<div class="private-content">{TEXT}</div>'
        );
    })
    ->listen(ConfigureFormatter::class, function (ConfigureFormatter $event) {
        $event->configurator->BBCodes->addCustom(
            '[private]{TEXT}[/private]',
            '<div class="private-content" data-must-be-logged-in="true">{TEXT}</div>'
        );
    });