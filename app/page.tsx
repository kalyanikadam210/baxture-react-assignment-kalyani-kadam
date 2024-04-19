
"use client"
import { Card,  Group, Text, Button,  Grid, Space } from '@mantine/core';
import { Avatar } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconAt,   IconPhoneCall, IconStar, IconTrash, IconUserMinus, IconUserPlus, IconWorld,  } from '@tabler/icons-react'

const Page = ({ }) => {
    const [userData, setUserData] = useState([]);
    const [followedUsers, setFollowedUsers] = useState(new Set());
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                return res.json();
            })
            .then((Data) => {
                setUserData(Data);
            });
    }, []);

    const handleFollowToggle = (userId: any) => {
        if (followedUsers.has(userId)) {
            followedUsers.delete(userId);
        } else {
            followedUsers.add(userId);
        }
        setFollowedUsers(new Set(followedUsers));
    };

    const handleDeleteUser = (userId: any) => {
        const updatedUserData = userData.filter((user: any) => user.id !== userId);
        setUserData(updatedUserData);
    };

    const isUserFollowed = (userId: any) => {
        return followedUsers.has(userId);
    };

    const divstyle = {
        margin: "30px",
    }

    return (
        <div style={divstyle}>
            <Grid>
                {userData.map((user: any) => (
                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={user.id}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} size="120px" />
                            </div>
                            <Space h="xs"/>
                            <Group justify="center">
                                <Text ta="center" fw={700}>{user.name} {isUserFollowed(user.id) ? <IconStar style={{ width: '16', height: '16'}}/>:''}</Text> 
                            </Group>
                            <Space h="xs" />
                            <Group>
                                <IconAt style={{ width: '1rem', height: '1rem', color: "#868E96" }} />
                                <Text style={{ color: "#868E96" }}>{user.email}</Text>
                            </Group>
                            <Space h="xs" />
                            <Group>
                                <IconPhoneCall style={{ width: '1rem', height: '1rem', color: "#868E96" }} />
                                <Text style={{ color: "#868E96" }}>{user.phone}</Text>
                            </Group>
                            <Space h="xs" />
                            <Group>
                                <IconWorld style={{ width: '1rem', height: '1rem', color: "#868E96" }} />
                                <Text style={{ color: "#868E96" }}>{user.website}</Text>
                            </Group>
                            <Space h="sm" />
                            <Group>
                                <Button size="sm" variant={isUserFollowed(user.id) ? 'outline':'filled'}  leftSection={isUserFollowed(user.id) ? <IconUserMinus   size={14}/>: <IconUserPlus size={14} />} onClick={() => handleFollowToggle(user.id)}>
                                    {isUserFollowed(user.id) ? 'Unfollow' : 'Follow'}
                                </Button>
                                <Button size="sm"
                                    variant="outline"
                                    leftSection={<IconTrash size={14}/>}
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Delete
                                </Button>
                            </Group>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    );
};
export default Page;
