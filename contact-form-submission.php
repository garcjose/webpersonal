<?php

// check for form submission - if it doesn't exist then send back to contact form
if (!isset($_POST["save"]) || $_POST["save"] != "contact") {
    header("Location: contacto.html"); exit;
}
	
// get the posted data
$name = $_POST["contact_name"];
$email_address = $_POST["contact_email"];
$message = $_POST["contact_message"];
		
// write the email content
$email_content = "Nombre: $name\n";
$email_content .= "Dirección de email: $email_address\n";
$email_content .= "Mensaje:\n\n$message";
	
// send the email
mail ("joseangel.jstyl8@gmail.com", "Nuevo Mensaje Web", $email_content);

// send the user back to the form
header("Location: contacto.html"); exit;

?>
