<?php

// check for form submission - if it doesn't exist then send back to contact form
if (!isset($_POST["save"]) || $_POST["save"] != "contact") {
    header("Location: contact.html"); exit;
}
	
// get the posted data
$name = $_POST["contact_name"];
$email_address = $_POST["contact_email"];
$message = $_POST["contact_message"];
		
// write the email content
$email_content = "Name: $name\n";
$email_content .= "Email Address: $email_address\n";
$email_content .= "Message:\n\n$message";
	
// send the email
mail ("joseangel.jstyl8@gmail.com", "New Web Message", $email_content);

// send the user back to the form
header("Location: contact.html"); exit;

?>
