CREATE OR REPLACE FUNCTION fixchroniccare() RETURNS VOID AS $$
    DECLARE
        rec RECORD;
        rec2 RECORD;
        arr VARCHAR[];
        arr2 VARCHAR[];
		m VARCHAR;
		n VARCHAR[];
    BEGIN
		create table chronic_care_ as
        select id, patient_id, facility_id, date_visit, client_type, current_status, clinic_stage, pregnancy_status, last_cd4, date_last_cd4,
            last_viral_load, date_last_viral_load, (select case when eligible_cd4 = 'Yes' then true when eligible_cd4 = 'No' then false else null end)
            as eligible_for_cd4, (select case when eligible_viral_load = 'Yes' then true when eligible_viral_load = 'No' then false else null end) as eligible_for_viral_load,
            (select case when cotrim_eligibility1 = 1 then true when cotrim_eligibility1 = 0 then false else null end) as plhiv_symtomatic_hiv,
            (select case when cotrim_eligibility2 = 1 then true when cotrim_eligibility2 = 0 then false else null end) as plhiv_asymtomatic_CD4_L500,
            (select case when cotrim_eligibility3 = 1 then true when cotrim_eligibility3 = 0 then false else null end) as plhiv_Active_Tb,
            (select case when cotrim_eligibility4 = 1 then true when cotrim_eligibility4 = 0 then false else null end) as plhiv_pregnant_after_1st_trimester,
            (select case when cotrim_eligibility5 = 1 then true when cotrim_eligibility5 = 0 then false else null end) as plhiv_L5_years,
            (select case when ipt = 'Yes' then true when ipt = 'NO' then false else null end) as ipt,
            (select case when inh = 'Yes' then true when inh = 'NO' then false else null end) as inh,
            (select case when tb_treatment = 'Yes' then true when tb_treatment = 'NO' then false else null end) as tb_treatment,
            date_started_tb_treatment,
            (select case when tb_referred = 'Yes' then true when tb_referred = 'NO' then false else null end) as tb_referred,
            (select case when eligible_ipt = 'Yes' then true when eligible_ipt = 'NO' then false else null end) as eligible_for_ipt,
            tb_values, body_weight, height, bmi, muac, muac_pediatrics, muac_pregnant,
            (select case when supplementary_food = 'Yes' then true when supplementary_food = 'NO' then false else null end) as supplementary_food,
            (select case when nutritional_status_referred = 'Yes' then true when nutritional_status_referred = 'NO' then false else null end) as nutritional_status_referred,
            (select case when gbv1 = 'Yes' then true when gbv1 = 'NO' then false else null end) as sexually_abused,
            (select case when gbv1_referred = 'Yes' then true when gbv1_referred = 'NO' then false else null end) as sexually_abused_referred,
            (select case when gbv2 = 'Yes' then true when gbv2 = 'NO' then false else null end) as essentials_Denied_By_Partner,
            (select case when gbv2_referred = 'Yes' then true when gbv2_referred = 'NO' then false else null end) as essentials_Denied_By_Partner_referred,
            (select case when hypertensive = 'Yes' then true when hypertensive = 'NO' then false else null end) as hypertensive,
            (select case when first_hypertensive = 'Yes' then true when first_hypertensive = 'NO' then false else null end) as first_hypertensive,
            (select case when bp_above = 'Yes' then true when bp_above = 'NO' then false else null end) as bp_above_140_90,
            (select case when bp_referred = 'Yes' then true when bp_referred = 'NO' then false else null end) as bp_referred,
            (select case when diabetic = 'Yes' then true when diabetic = 'NO' then false else null end) as diabetic,
            (select case when first_diabetic = 'Yes' then true when first_diabetic = 'NO' then false else null end) as first_diabetic,
            (select case when dm_referred = 'Yes' then true when dm_referred = 'NO' then false else null end) as dm_referred, dm_values,
            phdp1 as missed_arvs,
            (select case when phdp1_services_provided = 'Yes' then true when phdp1_services_provided = 'NO' then false else null end) as missed_arvs_services_provided,
            (select case when phdp2 = 'Yes' then true when phdp2 = 'NO' then false else null end) as status_disclosed_to_partner,
            (select case when phdp3 = 'Yes' then true when phdp3 = 'NO' then false else null end) as partner_status_known,
            (select case when phdp4 = 'Yes' then true when phdp4 = 'NO' then false else null end) as use_condoms_always,
            (select case when phdp4_services_provided = 'Yes' then true when phdp4_services_provided = 'NO' then false else null end) as use_condoms_always_services_provided,
            (select case when phdp5 = 'Yes' then true when phdp5 = 'NO' then false else null end) as opportunistic_infections,
            phdp6 as missed_cotrim, phdp7 as weekly_alcohol_consumption,
            (select case when phdp7_services_provided = 'Yes' then true when phdp7_services_provided = 'NO' then false else null end) as weekly_alcohol_consumption_services_provided,
            (select case when phdp8_services_provided = 'Yes' then true when phdp8_services_provided = 'NO' then false else null end) as wash_services_provided,
            (select case when 1=2 then true else null end) use_insecticide_nets, (select case when 1=2 then true else null end) cervical_cancer_screening ,
            (select case when 1=2 then true else null end) active_member_of_sg, (select case when 1=2 then true else null end) family_planning,
            (select case when 1=2 then true else null end) basic_care_kits, (select case when 1=2 then true else null end) disclosure_counseling,
            (select case when 1=2 then true else null end) social_services, (select case when 1=2 then true else null end) linkage_to_iga,
            (select case when 1=2 then true else null end) legal_services, (select case when 1=2 then true else null end) other_services,
            (select case when reproductive_intentions1 = 'Yes' then true when reproductive_intentions1 = 'NO' then false else null end) as cervical_cancer_screening_within_past_year,
            (select case when reproductive_intentions1_referred = 'Yes' then true when reproductive_intentions1_referred = 'NO' then false else null end) as cervical_cancer_screening_within_past_year_referred,
            (select case when reproductive_intentions2 = 'Yes' then true when reproductive_intentions2 = 'NO' then false else null end) as want_pregnancy_within_a_year,
            (select case when reproductive_intentions2_referred = 'Yes' then true when reproductive_intentions2_referred = 'NO' then false else null end) as want_pregnancy_within_a_year_referred,
            (select case when reproductive_intentions3 = 'Yes' then true when reproductive_intentions3 = 'NO' then false else null end) as currently_using_contraceptive,
            (select case when reproductive_intentions3_referred = 'Yes' then true when reproductive_intentions3_referred = 'NO' then false else null end) as currently_using_contraceptive_referred,
            (select case when malaria_prevention1 = 'Yes' then true when malaria_prevention1 = 'NO' then false else null end) as use_insecticide_bed_net,
            (select case when malaria_prevention1_referred = 'Yes' then true when malaria_prevention1_referred = 'NO' then false else null end) as use_insecticide_bed_net_referred,
            (select case when malaria_prevention2 = 'Yes' then true when malaria_prevention2 = 'NO' then false else null end) as pregnant_Intermittent_Preventive_Therapy,
            (select case when malaria_prevention2_referred = 'Yes' then true when malaria_prevention2_referred = 'NO' then false else null end) as pregnant_Intermittent_Preventive_Therapy_referred,
            community_pharmacy_id, last_modified, null as uploaded, null as time_uploaded, null as user_id, archived, uuid
        from chronic_care;

        DROP TABLE chronic_care cascade;

        FOR rec IN SELECT id, dm_values
            FROM chronic_care_
            WHERE dm_values IS NOT NULL AND dm_values != ''
        LOOP
            arr = regexp_split_to_array(rec.dm_values, E'#');
			FOREACH m IN ARRAY arr
			LOOP
			    arr2 = regexp_split_to_array(m, E',');
			    FOREACH n SLICE 1 IN ARRAY arr2
			    LOOP
			        IF(SELECT isint(n[1]))
			            THEN
				            INSERT INTO chronic_care_dm (chronic_care_id, dm_screen_id, description)
				                VALUES(rec.id, n[1]::INT, trim(n[2]));
				    END IF;
				END LOOP;
			END LOOP;
        END LOOP;

        FOR rec IN SELECT id, tb_values
            FROM chronic_care_
            WHERE tb_values IS NOT NULL AND tb_values != ''
        LOOP
            arr = regexp_split_to_array(rec.tb_values, E'#');
			FOREACH m IN ARRAY arr
			LOOP
			    arr2 = regexp_split_to_array(m, E',');
			    FOREACH n SLICE 1 IN ARRAY arr2
			    LOOP
			        IF(SELECT isint(n[1]))
			            THEN
				            INSERT INTO chronic_care_tb (chronic_care_id, tb_screen_id, description)
				                VALUES(rec.id, n[1]::INT, trim(n[2]));
				    END IF;
				END LOOP;
			END LOOP;
        END LOOP;

        DELETE FROM chronic_care_dm WHERE dm_screen_id NOT IN (SELECT id FROM dm_screen);
        DELETE FROM chronic_care_tb WHERE tb_screen_id NOT IN (SELECT id FROM tb_screen);

        ALTER TABLE chronic_care_ DROP COLUMN dm_values;
        ALTER TABLE chronic_care_ DROP COLUMN tb_values;

        ALTER TABLE chronic_care_ RENAME TO chronic_care;
    END;
$$
LANGUAGE PLPGSQL;

select fixchroniccare();
