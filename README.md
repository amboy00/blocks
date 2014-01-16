blocks
======

Blocks is blogging tool based on CodeIgniter.

A blog post can consist of many parts such as text, images, video, code, blockquotes, and other media. Blocks uses this concept to break down posts into smaller parts that can be managed better than one large blob of text.

CodeIgniter is a PHP framework this is built on.

##Installation

- install Codeigniter

Most of the work will happen in the application directory.

- install PHPBB

Or some other thrid-party software to manage authentication.  Make sure you can access its features through a library. Or write your own, but that's not a part of this repo.  Just follow its installation guide to continue.  The Administrator username and password you choose during install can be used for Blocks.  Since this is just for managing authentication, SMTP settings or other info is optional.

- update Phpbb_library line 32.