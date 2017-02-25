CREATE DEFINER=`bf7ce179ab4842`@`%` PROCEDURE `spAddMessage`(
	email VARCHAR(45),
	message VARCHAR(160)
)
BEGIN

if (SELECT COUNT(idnew_emails) FROM new_emails where email_address=email) = 0 then
INSERT INTO `new_emails` (`email_address`) VALUES (email);
end if;

INSERT INTO new_table (message, poster_email) 
	VALUES (
		message,
        (SELECT idnew_emails FROM new_emails where email_address=email)
        );
        
END