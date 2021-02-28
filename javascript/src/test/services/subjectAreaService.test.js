import { fetchSubjectAreas } from "main/services/subjectAreaService";
import { allTheSubjects } from "main/fixtures/Courses/subjectFixtures";

import fetch from "isomorphic-unfetch";
jest.mock("isomorphic-unfetch");

describe("statisticsService tests", () => {
    test("fetchSubjectAreas on success", async () => {

        fetch.mockResolvedValue({
            status: 200,
            ok: true,
            json: () => {
                return allTheSubjects;
            },
        });

        const result = await fetchSubjectAreas();
        expect(result).toBe(allTheSubjects);

    });
    test("fetchSubjectAreas on failure", async () => {

        fetch.mockResolvedValue({
            status: 404,
            ok: false,
            url: "/api/someEndpoint"
        });

        await expect(fetchSubjectAreas())
            .rejects
            .toThrow('getting /api/someEndpoint, status=404');

    });
});