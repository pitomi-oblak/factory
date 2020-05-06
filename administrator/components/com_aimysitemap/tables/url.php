<?php
/*
 * Copyright (c) 2014-2017 Aimy Extensions, Lingua-Systems Software GmbH
 *
 * http://www.aimy-extensions.com/
 *
 * License: GNU GPLv2, see LICENSE.txt within distribution and/or
 *          http://www.aimy-extensions.com/software-license.html
 */
 defined( '_JEXEC' ) or die(); class AimySitemapTableUrl extends JTable { public function __construct( &$db ) { return parent::__construct( '#__aimysitemap', 'id', $db ); } } 
