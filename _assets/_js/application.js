(function($){
	//toolbar interface
	var currentMenu,
	currentButton,
	menuPosition,
	menuWidth,
	menuHeight,
	blockCount = 3,
	blockId,
	postId;
	
	function trackMenu(mouseX, mouseY) {
		if (currentMenu) {
			if ((mouseX > menuPosition.left) && (mouseX < (menuPosition.left + menuWidth)) && (mouseY > menuPosition.top) && (mouseY < (menuPosition.top + menuHeight))) {
				// mouse is over menu
			} else {
				// mouse is not over menu, so hide it
				$('.' + currentButton).click();
			}
		}
	}
		
	function orderBlockPositions() {
		$('.blockPosition').each( function(i) {
			$(this).val(i);
		})
	}
	
	var myData ='',
	isDirty = false,
	timeout = setTimeout( function(){ timeout=null; autosave(); }, 1000);
	
	var updateBlog = function(myNewData) {
		var success = false;
		$.ajax({
			url: '/admin/blog/blog_edit',
			global: false,
			type: 'POST',
			data: ({simple: 'true', formData: myNewData}),
			dataType: 'json',
			async:false,
			success: function(msg){
				success = msg;
			}
		});
		return success;
	}
	
	var publishBlog = function(myNewData) {
		var success = false;
		$.ajax({
			url: '/admin/blog/blog_edit',
			global: false,
			type: 'POST',
			data: ({simple: 'true', formData: myNewData, publish: true}),
			dataType: 'json',
			async:false,
			success: function(msg){
				success = msg;
			}
		});
		return success;
	}
	
	
	
	function autosave() {
		//
		//grab all the data and send to the server
		//
		var myNewData = $('#form').serialize(),
		success;
		if (myData == myNewData) {
			isDirty = false;
			console.log('clean');
		} else {
			isDirty = true;
			console.log('autosaving...');
			$('#growl').fadeIn('fast');
			success = updateBlog(myNewData);
			
			if (success.success == 'true') {
				console.log('saved!');
				$('#growl').fadeOut('fast');
				myData = myNewData;
				isDirty = false;
				
				$('#postId').val(success.post_id);
			}
		}
		
		postId = $('#postId').val();
	}
	
	function publish() {
		//
		//grab all the data and send to the server
		//
		var myNewData = $('#form').serialize(),
		success;
		if (myData == myNewData) {
			isDirty = false;
			console.log('clean');
		} else {
			isDirty = true;
			console.log('autosaving...');
			$('#growl').fadeIn('fast');
			success = publishBlog(myNewData);
			
			if (success.success == 'true') {
				console.log('saved!');
				$('#growl').fadeOut('fast');
				myData = myNewData;
				isDirty = false;
				
				$('#postId').val(success.post_id);
			}
		}
		
		postId = $('#postId').val();
	}
	
	
	function addBlock(blockId, blockName) {
		
		switch (blockName) {
			case 'Body':
				html =	'<div class="blockTiny ui-selectee ui-selected" id="block' + blockId + '"><span class="ui-icon ui-icon-trash trash" title="' + blockId + '"></span><span class="ui-icon ui-icon-plus expand"></span><span class="ui-icon ui-icon-minus collapse"></span>' +
						'	<h3>Body</h3>' +
						'	<input type="hidden" name="block[' + blockId + '][block_order]" value="0" class="blockPosition">' +
						'	<input type="hidden" name="block[' + blockId + '][type]" value="body">' +
						'	<input type="hidden" name="block[' + blockId + '][blockId]" value="' + blockId + '">' +
						'	<div class="blockEditView">' +
						'		<div class="row">' +
						'			<label>Body Text</label>' +
						'			<textarea class="text" name="block[' + blockId + '][field_id_1]"></textarea>' +
						'		</div>' +
						'	</div>' +
						'</div>';
				break;
			case 'Image':
				html =	'<div class="blockTiny ui-selectee ui-selected" id="block' + blockId + '"><span class="ui-icon ui-icon-trash trash" title="' + blockId + '"></span><span class="ui-icon ui-icon-plus expand"></span><span class="ui-icon ui-icon-minus collapse"></span>' +
						'	<h3>Image</h3>' +
						'	<input type="hidden" name="block[' + blockId + '][block_order]" value="0" class="blockPosition">' +
						'	<input type="hidden" name="block[' + blockId + '][type]" value="image">' +
						'	<input type="hidden" name="block[' + blockId + '][blockId]" value="' + blockId + '">' +
						'	<div class="blockEditView">' +
						'		<div class="tempImage" id="tempImage' + blockId + '"></div>' +
						'		<div class="row">' +
						'			<p class="note">Select an image from your library</p>' +
						'			<div class="button openLibrary" title="' + blockId + '">Open Library</div>' +
						'			<input type="hidden" name="block[' + blockId + '][field_id_1]" value="" id="selectImageId' + blockId + '">' +
						'		</div>' +
						'		<div class="clearfix"></div>' +
						'		<div class="row">' +
						'			<label>Caption</label>' +
						'			<input class="text" type="text" name="block[' + blockId + '][field_id_3]" value="">' +
						'			<p class="note">You may override the given caption if you wish</p>' +
						'		</div>' +
						'		<div class="row">' +
						'			<p class="note">Choose the position of this image</p>' +
						'			<div class="buttonset">' +
						'				<input type="radio" id="left[' + blockId + ']" name="block[' + blockId + '][field_id_4]" value="left"><label for="left[' + blockId + ']">Left</label>' +
						'				<input type="radio" id="center[' + blockId + ']" name="block[' + blockId + '][field_id_4]" value="center"><label for="center[' + blockId + ']">Center</label>' +
						'				<input type="radio" id="right[' + blockId + ']" name="block[' + blockId + '][field_id_4]" value="right"><label for="right[' + blockId + ']">Right</label>' +
						'			</div>' +
						'		</div>' +
						'	</div>' +
						'</div>';
				break;
			case 'Media':
				html =	'<div class="blockTiny ui-selectee ui-selected" id="block' + blockId + '"><span class="ui-icon ui-icon-trash trash" title="' + blockId + '"></span><span class="ui-icon ui-icon-plus expand"></span><span class="ui-icon ui-icon-minus collapse"></span>' +
						'	<h3>Media</h3>' +
						'	<input type="hidden" name="block[' + blockId + '][block_order]" value="0" class="blockPosition">' +
						'	<input type="hidden" name="block[' + blockId + '][type]" value="media">' +
						'	<input type="hidden" name="block[' + blockId + '][blockId]" value="' + blockId + '">' +
						'	<div class="blockEditView">' +
						'		<div class="row">' +
						'			<textarea id="body" name="block[' + blockId + '][field_id_1]" class="text"></textarea>' +
						'			<p class="note">EMBED or IFRAME code only. Your blog post will display a 640 pixel width block for your video.</p>' +
						'		</div>' +
						'		<div class="row">' +
						'			<label>Title</label>' +
						'			<input type="text" class="text" name="block[' + blockId + '][field_id_2]" value="" placeholder="Media Title">' +
						'		</div>' +
						'		<div class="row">' +
						'			<label>url</label>' +
						'			<input type="text" class="text" name="block[' + blockId + '][field_id_3]" value="" placeholder="http://">' +
						'			<p class="note">The URL of the source of this media.</p>' +
						'		</div>' +
						'		<div class="row">' +
						'			<label>Description</label>' +
						'			<input type="text" class="text" name="block[' + blockId + '][field_id_4]" value="" placeholder="what is this about">' +
						'			<p class="note">Adding context to your media helps readers who may not be able to view, or want more info before enabling the media file.</p>' +
						'		</div>' +
						'	</div>' +
						'</div>';
				break;
			case 'Blockquote':
				html =	'<div class="blockTiny ui-selectee ui-selected" id="block' + blockId + '"><span class="ui-icon ui-icon-trash trash" title="' + blockId + '"></span><span class="ui-icon ui-icon-plus expand"></span><span class="ui-icon ui-icon-minus collapse"></span>' +
						'	<h3>Blockquote</h3>' +
						'	<input type="hidden" name="block[' + blockId + '][block_order]" value="0" class="blockPosition">' +
						'	<input type="hidden" name="block[' + blockId + '][type]" value="blockquote">' +
						'	<input type="hidden" name="block[' + blockId + '][blockId]" value="' + blockId + '">' +
						'	<div class="blockEditView">' +
						'		<div class="row">' +
						'			<label>Quote Text</label>' +
						'			<textarea class="text" name="block[' + blockId + '][field_id_1]"></textarea>' +
						'		</div>' +
						'		<div class="row">' +
						'			<label for="cite">Citation</label>' +
						'			<input type="text" id="cite" class="text" name="block[' + blockId + '][field_id_2]" placeholder="Quote source">' +
						'			<p>Recommended for blockquotes. Not used for pullquotes.</p>' +
						'		</div>' +
						'		<div class="row">' +
						'			<p class="note">Excerpt Type</p>' +
						'			<div class="quoteType buttonset">' +
						'				<input type="radio" id="blockquote[' + blockId + ']" name="block[' + blockId + '][field_id_3]" value="blockquote"><label for="blockquote[' + blockId + ']" class="radioLabel">Blockquote</label>' +
						'				<input type="radio" id="pullquote[' + blockId + ']" name="block[' + blockId + '][field_id_3]" value="pullquote"><label for="pullquote[' + blockId + ']" class="radioLabel">Pullquote</label>' +
						'			</div>' +
						'		</div>' +
						'		<div class="row">' +
						'			<p class="note">Alignment</p>' +
						'			<div class="alignment buttonset">' +
						'				<input type="radio" id="left[' + blockId + ']" name="block[' + blockId + '][field_id_4]" value="left"><label for="left[' + blockId + ']" class="radioLabel">Left</label>' +
						'				<input type="radio" id="center[' + blockId + ']" name="block[' + blockId + '][field_id_4]" value="center"><label for="center[' + blockId + ']" class="radioLabel">Center</label>' +
						'				<input type="radio" id="right[' + blockId + ']" name="block[' + blockId + '][field_id_4]" value="right"><label for="right[' + blockId + ']" class="radioLabel">Right</label>' +
						'			</div>' +
						'		</div>' +
						'	</div>' +
						'</div>';
					break;
				
				
		}
			
		$(html).appendTo('#sortable');
		$('.button').button();
		$('.buttonset').buttonset();
		
		orderBlockPositions();
		
	}
	
	var getBlockId = function() {
		var success = false;
		$.ajax({
			url: '/admin/blog/new_block',
			global: false,
			type: 'POST',
			data: ({simple: 'true'}),
			dataType: 'json',
			async:false,
			success: function(msg){
				success = msg;
			}
		});
		return success;
	}
	
	function deleteBlock(blockId) {
		var success = deleteBlockId(blockId);
		
		if ( success.success == 'true' ) {
			console.log('deleted!');
			autosave();
			
			$('#block' + blockId).fadeOut('fast').remove();
		}
		
	}
	
	var deleteBlockId = function(blockId) {
		var success = false;
		$.ajax({
			url: '/admin/blog/block_delete',
			global: false,
			type: 'POST',
			data: ({block_id: blockId, post_id: $('#postId').val()}),
			dataType: 'json',
			async: false,
			success: function(msg) {
				success = msg
			}
		});
		return success;
	}
	
	//Images
	var imageId,
	uri,
	description,
	filename_large,
	filename_small,
	filename_thumb,
	imageBlockId;

	function updateImage() {
		var imageHTML = '<img src="http://s3.amazonaws.com/martinilab/' + window.filename_thumb + '">',
		myImageId = window.imageId;
		console.log('window.imageId: ' + myImageId);
		console.log(imageBlockId);
		$('#tempImage' + imageBlockId).html(imageHTML);
		$('#selectImageId' + imageBlockId).val(myImageId);
	}
	
	var loadImages = function() {
		var success = false;
	}
	
// The DOM is now ready
$(function() {
	myData = $('#form').serialize();
	orderBlockPositions();
	
	$('body').bind('click', function(e) {
		trackMenu(e.pageX, e.pageY);
	});
	
	$('#sortable').sortable({
		opacity:0.6, // opacity of dragged element
		cursor:'move', // set cursor type
		tolerance:'pointer', // pointer hit
		revert: 200, //animation
		update: function(event, ui) {
			orderBlockPositions();
		},
		handle: 'h3',
		axis: 'y'
	});
	
	$('#sortable').bind('sortchange', function() {
	})
	
	$('.button').button();
	$('.buttonset').buttonset();
	
	

	$('.switcher').click( function() {
		if ( $(this).hasClass('switcherDown') ) { 
			$('.selectOptions').hide();
			$(this).removeClass('switcherDown');

			currentMenu = null;
			currentButton = null;

		} else { 
            
			$('.selectOptions').show();
			$(this).addClass('switcherDown');

			currentButton = 'switcher';
			currentMenu = 'selectOptions';

			menuPosition = $(this).offset();
			menuWidth = $(this).width();
			menuHeight = $(this).height();
			
		}
		
		return false;
	
	});

	$('.blockSelect').click( function() {
		var blockName = $(this).text(),
		html = '',
		success = getBlockId();
		
		console.log('block selected was ' + blockName);
		
		if (success.success == 'true') {
			addBlock(success.blockId, blockName);
			$('.switcher').click();
			return false;
		} else {
			alert('No new Block for you!');
			return false;
		}
		
	});
	
	$('.collapse').live('click', function() {
		$(this).parent('.blockTiny').removeClass('ui-selected');

	});
	$('.expand').live('click', function() {
		$(this).parent('.blockTiny').addClass('ui-selected');
		
	});
	$('.trash').live('click', function() {
		blockId = $(this).attr('title');
		$('#deleteDialog').dialog('open');
	})
	
	$('#deleteDialog').dialog({
		autoOpen: false,
		height: 200,
		width: 350,
		modal: true,
		buttons: {
			'Delete': function() {
				deleteBlock(blockId);
				$( this ).dialog( "close" );
			},
			'Keep': function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {
			//$( this ).dialog( "close" );
		}
	});
	
	//Status Change
	$('#statusDialog').dialog({
		autoOpen: false,
		height: 200,
		width: 350,
		modal: true,
		buttons: {
			'Live': function() {
				$('#status').val('live');
				$('#statusText').text('Live');
				publish();
				$( this ).dialog( "close" );
			},
			'Draft': function() {
				$('#status').val('draft');
				$('#statusText').text('Draft');
				autosave();
				$( this ).dialog( "close" );
			}
		},
		close: function() {
			//$( this ).dialog( "close" );
		}
	});
	
	
	$('#statusButton').click( function() {
		$('#statusDialog').dialog('open');
	});
	
	//Images
	$('#imageLibrary').dialog({
		autoOpen: false,
		modal: true,
		height: 500,
		width: 500,
		buttons: {
			Select: function() {
				updateImage();
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {
			//$( this ).dialog( "close" );
		}
		
	});

	$('.openLibrary').live('click', function() {
		imageBlockId = $(this).attr('title');
		console.log(imageBlockId)
		$('#imageLibrary').dialog('open');
		$("#modalIframeId").attr("src","/admin/images/iframe_list");
	});
	
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { 
			// $('#modalClose').click(); 
		} 
		
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout( function(){ timeout=null; autosave(); }, 3000);
		       
		
	});
	
	
	
	
	
	$(function(){
		
		
		
	});
	
	
});

})( jQuery.noConflict() ); // Pass in jQuery so we can safely use the $ alias within this block
