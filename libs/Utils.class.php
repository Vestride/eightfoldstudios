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

        if (!empty($message->name)) {
            $errors[] = "The name field is hidden and should have been blank!";
        }
        
        if (empty($message->actual_name)) {
            $errors[] = "You must entera value for Name";
        }

        // Validate email address is not empty or invalid
        if (empty($message->email)) {
            $errors[] = "You have not entered an email address";
        } elseif (!filter_var($message->email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "You have not entered a valid email address";
        }

        if (empty($message->message)) {
            $errors[] = "Please enter a message.";
        }

        return $errors;
    }

    // TODO move to functions and use get_option('admin_email');
    public static function sendContactMessage($message, $to = array('cheney.glen@gmail.com', 'jake.likewise@gmail.com')) {
        $headers = "From: {$message->email}" . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

        $emailbody = "<p>You have recieved a new message from the enquiries form on your website.</p>";

        foreach ($message as $field => $value) {
            $emailbody .= "<p><strong>" . ucfirst($field) . ": </strong> " . nl2br($value) . "</p>";
        }

        $subject = $message->subject != '' ? $message->subject : 'New Inquiry at eighfoldstudios.com';

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
