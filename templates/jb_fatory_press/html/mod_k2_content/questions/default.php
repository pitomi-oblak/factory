<?php
/**
 * @version    2.7.x
 * @package    K2
 * @author     JoomlaWorks http://www.joomlaworks.net
 * @copyright  Copyright (c) 2006 - 2016 JoomlaWorks Ltd. All rights reserved.
 * @license    GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

// no direct access
defined('_JEXEC') or die;
?>

<div id="accordion" class="panel-group">
    <?php if (count($items)): ?>
        <?php foreach ($items as $key => $item): ?>
            <div class="col-md-12 panel panel-default question-title">
                <?php if ($params->get('itemTitle')): ?>
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            <a class="panel-toggle" data-toggle="collapse" data-parent="#accordion"
                               href="#item-<?php echo $key; ?>"><?php echo $item->title; ?></a>
                        </h3>
                    </div>
                <?php endif; ?>
                <div id="item-<?php echo $key; ?>" class="panel-collapse collapse">
                    <div class="panel-body">
                        <?php if ($params->get('itemIntroText')): ?>
                            <?php echo $item->introtext; ?>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>

