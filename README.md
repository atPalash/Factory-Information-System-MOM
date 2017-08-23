# Manufactoring Operation Management for a mobile phone production Line

## Objective

Illustrate use of selected messages from IPC-2501 and IPC-2541 standards to monitor the status of machines in the production line. The states of the machines are saved to the MySQL database in order to create later the trends for production system and its machines. Build the code for FASTory line simulator (http://escop.rd.tut.fi:3000/) 

##  Implementation
Each machine implements CAMX communication approach. As such there is Message Broker (MSB). In order to test MSB before deploying it for the actual line, we implemented two clients - Machine Application (MA) (representing actual equipment) and Archiver Application (AA) (saves data to the database). The system architecture can be depicted as follows: MA <---> MSB <---> AA.

The MA implements EquipmentHeartbeat and EquipmentChangeState messages from IPC-2541 standard. The IPC-2501 standard has to be used for MA, MSB and AA integration. On MA side, it also reacts to the sequential change of the sates that would trigger MA sending EquipmentChangeState messages. On the AA side, the AA should subscribe for EquipmentChangeState and EquipmentHeartbeat messages. AA should store to the database changing states and rise an alarm to the operator once it does not get the EquipmentHearbeat message in the due time. The rise of alarm can be just a printing to the console that the heartbeat is missing.

### video
please watch video for explanation/demonstration: https://www.youtube.com/watch?v=spih9fLggpI
