UPDATE pharmacy SET regimen_id = 116 WHERE regimen_id = 123;
UPDATE pharmacy SET regimen_drug_id = 226 WHERE regimen_drug_id = 317;
UPDATE pharmacy SET regimen_drug_id = 227 WHERE regimen_drug_id = 318;
UPDATE pharmacy SET regimen_drug_id = 225 WHERE regimen_drug_id = 316;
DELETE FROM regimen_drug WHERE regimen_id = 123;
DELETE FROM regimen WHERE id = 123;
