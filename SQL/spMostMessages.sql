CREATE DEFINER=`bf7ce179ab4842`@`%` PROCEDURE `spMostMessages`()
BEGIN
SELECT email_address, COUNT(poster_email) FROM 
heroku_9f3983ebc41e915.new_table join
heroku_9f3983ebc41e915.new_emails on poster_email = idnew_emails
group by poster_email 
ORDER BY COUNT(poster_email) DESC 
LIMIT 1;
END