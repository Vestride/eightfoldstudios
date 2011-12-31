<?php


class Utils {

    public static function is_ajax() {
        return isset($_GET['ajax']);
    }

    public static function pageTitle($title = '') {
        if ($title) {
            return $title . ' &middot; Eightfold Studios';
        } else {
            return 'Eightfold Studios';
        }
    }

    public static function pageTitleSpan($pageTitle = '') {
        return '<span id="page-title" class="hidden">' . self::pageTitle($pageTitle) . "</span>\n";
    }

    public static function header($page = 'home') {
        
        ?>
                <header>
                    <nav id="nav" role="navigation">
                        <ul>
                            <li><?= self::headerLink('Home', '#main', 'home', $page) ?></li>
                            <li><?= self::headerLink('About Us', '#about', 'about', $page); ?></li>
                            <li><?= self::headerLink('Work', '#work', 'work', $page); ?></li>
                            <li><?= self::headerLink('Contact', '#contact', 'contact', $page); ?></li>
                            <li><?= self::headerLink('Blog', '#blog', 'blog', $page); ?></li>
                        </ul>
                    </nav>
                </header>
    <?
    }

    public static function headerLink($title, $href, $id, $page = '') {
        $class = '';
        if ($id == $page) {
            $class = ' class="in"';
        }
        return "<a href=\"" . get_bloginfo('url') . "/$href\" id=\"a-$id\"$class>$title</a>";
    }
    
    public static function svgTitle($title, $width = 138, $height = 25) {
        ?>
        <header>
            <h1 class="section-title text-right">
                <svg width="<?= $width; ?>" height="<?= $height; ?>" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <linearGradient id="gradientDefinition" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                            <stop offset="0%"   stop-color="#F0F0F0" />
                            <stop offset="93%"  stop-color="#9E9E9E" />
                            <stop offset="100%" stop-color="#F0F0F0" />
                        </linearGradient>
                    </defs>
                    <text id="horizontalText" x="0" y="25" fill="url(#gradientDefinition)" >
                        <?= $title; ?>
                    </text>
                </svg>
            </h1>
        </header>
        
        <?
    }

    /**
     *
     * Converts character to html entities (aka from < to &lt;)
     * replaces anything found in the $blacklist array with nothing
     * pads quotes with \
     * trims the string
     * @param $str string to sanitize
     * @param $convertQuotes bool [optional] makes quotes html entities instead of escaping them
     * @param $fwdSlashOk bool [optional] allow '/' in the string
     * @return string safe string
     */
    public static function sanitizeString($str, $convertQuotes = true, $fwdSlashOk = false) {
        $blacklist = array("/`/", "/</", "/>/", "/%/", "/\\\/", "/\|/");
        if (!$fwdSlashOk) {
            $blacklist[] = "/\//";
        }
        $str = trim($str);
        if ($convertQuotes) {
            $str = htmlentities($str, ENT_QUOTES);
        } else {
            $str = htmlentities($str, ENT_NOQUOTES);
            $str = str_replace('"', '\"', $str);
            $str = str_replace("'", "\'", $str);
        }
        $str = preg_replace($blacklist, "", $str);
        return $str;
    }

    public static function validateContactForm($message) {
        $errors = array();

        if (empty($message->name)) {
            $errors[] = "You have not entered a name!";
        }

        // Validate email address is not empty or invalid
        if (empty($message->email)) {
            $errors[] = "You have not entered an email address";
        } elseif (!filter_var($message->email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "You have not entered a valid email address";
        }

        if (empty($message->human)) {
            $errors[] = "You must enter a value for the prove you&rsquo;re human.";
        } else if ($message->human != 5) {
            $errors[] = "2 + 3 is not " . $message->human;
        }

        if (empty($message->message)) {
            $errors[] = "Please enter a message.";
        }

        return $errors;
    }

    public static function sendContactMessage($message, $to = array('cheney.glen@gmail.com')) {
        $headers = "From: {$message->email}" . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

        $emailbody = "<p>You have recieved a new message from the enquiries form on your website.</p>";

        foreach ($message as $field => $value) {
            $emailbody .= "<p><strong>" . ucfirst($field) . ": </strong> " . nl2br($value) . "</p>";
        }

        $subject = $message->subject != '' ? $message->subject : 'New Inquiry';

        $allGood = true;
        foreach ($to as $addr) {
            if (!mail($addr, $subject, $emailbody, $headers)) {
                $allGood = false;
            }
        }

        return $allGood;
    }
}

?>
