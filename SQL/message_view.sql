CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `bf7ce179ab4842`@`%` 
    SQL SECURITY DEFINER
VIEW `message_view` AS
    SELECT 
        `new_table`.`message` AS `message`,
        `new_emails`.`email_address` AS `email_address`
    FROM
        (`new_emails`
        JOIN `new_table` ON ((`new_emails`.`idnew_emails` = `new_table`.`poster_email`)))