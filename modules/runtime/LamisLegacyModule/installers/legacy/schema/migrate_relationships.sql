CREATE OR REPLACE FUNCTION migrate_pharmacy_adr() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT id, archived FROM pharmacy WHERE id IN (SELECT DISTINCT pharmacy_id FROM pharmacy_adverse_drug_reaction)
        LOOP
			UPDATE pharmacy p SET adverse_drug_reactions = (
				SELECT array_to_json(array_agg(row_to_json(t))) FROM (
	                SELECT severity, (SELECT row_to_json(t) FROM (
		                SELECT id, description FROM adverse_drug_reaction where id = adr.adverse_drug_reaction_id
		            ) t) adverse_drug_reaction FROM pharmacy_adverse_drug_reaction adr WHERE pharmacy_id = rec.id
		            AND (archived = false OR (archived = true AND rec.archived = true))
                ) t
			) WHERE id = rec.id;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

select migrate_pharmacy_adr();


CREATE OR REPLACE FUNCTION migrate_clinic_adr() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT id, archived FROM clinic WHERE id IN (SELECT DISTINCT clinic_id FROM clinic_adverse_drug_reaction)
        LOOP
			UPDATE clinic p SET adverse_drug_reactions = (
				SELECT array_to_json(array_agg(row_to_json(t))) FROM (
	                SELECT severity, (SELECT row_to_json(t) FROM (
		                SELECT id, description FROM adverse_drug_reaction where id = adr.adverse_drug_reaction_id
		            ) t) "adverseDrugReaction" FROM clinic_adverse_drug_reaction adr WHERE clinic_id = rec.id
		            AND (archived = false OR (archived = true AND rec.archived = true))
                ) t
			) WHERE id = rec.id;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

select migrate_clinic_adr();

CREATE OR REPLACE FUNCTION migrate_chronic_care_tb() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT id, archived FROM chronic_care WHERE id IN (SELECT DISTINCT chronic_care_id FROM chronic_care_tb)
        LOOP
			UPDATE chronic_care p SET tb_screens = (
				SELECT array_to_json(array_agg(row_to_json(t))) FROM (
	                SELECT description answer, (SELECT row_to_json(t) FROM (
		                SELECT id, description FROM tb_screen where id = adr.tb_screen_id
		            ) t) question FROM chronic_care_tb adr WHERE chronic_care_id = rec.id
		           AND (archived = false OR (archived = true AND rec.archived = true))
                ) t
			) WHERE id = rec.id;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

select migrate_chronic_care_tb();

CREATE OR REPLACE FUNCTION migrate_chronic_care_dm() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT id, archived FROM chronic_care WHERE id IN (SELECT DISTINCT chronic_care_id FROM chronic_care_dm)
        LOOP
			UPDATE chronic_care p SET dm_screens = (
				SELECT array_to_json(array_agg(row_to_json(t))) FROM (
	                SELECT description answer, (SELECT row_to_json(t) FROM (
		                SELECT id, description FROM tb_screen where id = adr.tb_screen_id
		            ) t) question FROM chronic_care_dm adr WHERE chronic_care_id = rec.id
		           AND (archived = false OR (archived = true AND rec.archived = true))
                ) t
			) WHERE id = rec.id;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

select migrate_chronic_care_dm();

CREATE OR REPLACE FUNCTION migrate_clinic_adhere() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT id, archived FROM clinic WHERE id IN (SELECT DISTINCT clinic_id FROM clinic_adhere)
        LOOP
			UPDATE clinic p SET adheres = (
				SELECT array_to_json(array_agg(row_to_json(t))) FROM (
	                SELECT (SELECT row_to_json(t) FROM (
		                SELECT id, description FROM adhere where id = adr.adhere_id
		            ) t) adhere FROM clinic_adhere adr WHERE clinic_id = rec.id
		           AND (archived = false OR (archived = true AND rec.archived = true))
                ) t
			) WHERE id = rec.id;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

select migrate_clinic_adhere();

CREATE OR REPLACE FUNCTION migrate_clinic_opportunistic_infection() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN SELECT id, archived FROM clinic WHERE id IN (SELECT DISTINCT clinic_id FROM clinic_opportunistic_infection)
        LOOP
			UPDATE clinic p SET opportunistic_infections = (
				SELECT array_to_json(array_agg(row_to_json(t))) FROM (
	                SELECT (SELECT row_to_json(t) FROM (
		                SELECT id, description FROM opportunistic_infection where id = adr.opportunistic_infection_id
		            ) t) "opportunisticInfection" FROM clinic_opportunistic_infection adr WHERE clinic_id = rec.id
		           AND (archived = false OR (archived = true AND rec.archived = true))
                ) t
			) WHERE id = rec.id;
        END LOOP;
    END;
$$
LANGUAGE PLPGSQL;

select migrate_clinic_opportunistic_infection();
