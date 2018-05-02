DELETE FROM ConfigSettings WHERE Name LIKE 'study_tracker%';

INSERT INTO ConfigSettings (Name, Description, Visible, Label, OrderNumber)
VALUES ('study_tracker', 'Study Tracker Variables', 1, 'Study Tracker', 13);

INSERT INTO ConfigSettings (Name, Description, Visible, Label, OrderNumber)
VALUES ('study_tracker_visit_deadline', 'Number of days given for a user to create and start a visit after the specified date', 1, 'Days to start visit registration', 1);

INSERT INTO ConfigSettings (Name, Description, Visible, Label, OrderNumber)
VALUES ('study_tracker_data_entry_deadline', 'Number of days given for a user to complete data entry after visit creation', 1, 'Days to complete data entry', 2);

UPDATE ConfigSettings SET Parent=99 WHERE Name LIKE 'study_tracker_%';

DELETE FROM Config WHERE ConfigID=(SELECT ID FROM ConfigSettings WHERE Name='study_tracker_visit_deadline');
DELETE FROM Config WHERE ConfigID=(SELECT ID FROM ConfigSettings WHERE Name='study_tracker_data_entry_deadline');
INSERT INTO Config (ConfigID, Value) VALUES ((SELECT ID FROM ConfigSettings WHERE Name='study_tracker_visit_deadline'), 90);

INSERT INTO Config (ConfigID, Value) VALUES ((SELECT ID FROM ConfigSettings WHERE Name='study_tracker_data_entry_deadline'), 14);
