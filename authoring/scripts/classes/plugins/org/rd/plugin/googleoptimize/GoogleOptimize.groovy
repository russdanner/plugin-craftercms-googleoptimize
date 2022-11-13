package plugins.org.rd.plugin.trellowf

@Grab(group='io.github.http-builder-ng', module='http-builder-ng-core', version='1.0.4', initClass=false)

import groovy.json.JsonSlurper
import groovyx.net.http.HttpBuilder
import static groovyx.net.http.HttpBuilder.configure;



/**
 * API service wrapper for Trello
 */
public class Trello {

    def pluginConfig
    def key
    def token
    def defaultBoardId

   /**
     * constructor
     */
    Trello(pluginConfig) {
        this.pluginConfig = pluginConfig
        this.key = pluginConfig.getString("trelloApiKey")
        this.token = pluginConfig.getString("trelloApiToken")
        this.defaultBoardId = pluginConfig.getString("trelloDefaultBoardId")
    }

    def moveCard(boardId, listId, cardId) {
        def result = trelloPut("/1/cards/${cardId}?idList=${listId}")
        return result
    }

    def attachContentToCard(name, cardId, siteId, contentId) {
        def studioServer = "http://localhost:8080"
        def contentName = java.net.URLEncoder.encode(name, "UTF-8")
        def attachmentUrl = "${studioServer}/studio/plugin%3Fsite%3D${siteId}%26type%3Dapps%26pluginId%3Dorg.rd.plugin.trellowf%26name%3Dtrellowf%26file%3Dapp.js%23/preview%3FcontentId%3D${contentId}%26siteId%3D${siteId}"
        def result = trelloPost("/1/cards/${cardId}/attachments?name=${contentName}&url=${attachmentUrl}")
        return result
    }

    /**
     * Get board details
     * @param boardId the board to retrieve
     */
    def getBoard(boardId) {
        def tBoardId = getBoardId(boardId)
        def board = trelloGet("/1/boards/${tBoardId}")
        return board
    }

    /**
     * Get all of the lists on a given board
     * @param boardId the board to retrieve
     */
    def getListsForBoard(boardId) { 
        def result = [:]

        def tBoardId = getBoardId(boardId)

        result.board = getBoard(tBoardId)

        result.lists = trelloGet("/1/boards/${tBoardId}/lists")

        result.lists.each { list -> 
            def cards = getCardsForList(list.id)
            list.cards = cards

            cards.each { card ->
                if(card.badges.attachments > 0) {
                    card.cardAttachments = getAttachmentsForCard(card.id)
                }
            }
        }

        return result
    }

    /**
     * If boardId is null, default ID is returned
     */
    def getBoardId(boardId) {

        def id = boardId
        if(!boardId || boardId == null || boardId == "") {
            // Use the default board ID if one is not provided
            id = defaultBoardId
        }

        return id
    }

    /**
     * Get all details for a card (attachments, tasks, comments)
     * @param cardId the list of cards to retrieve
     */
    def getDetailsForCard(cardId) {
        def result = [:]

        result.attachments = getAttachmentsForCard(cardId)

        return result
    }

    /**
     * Get all attachments on a card
     * @param cardId the list of cards to retrieve
     */
    def getAttachmentsForCard(cardId) {
        def attachments = trelloGet("/1/cards/${cardId}/attachments")
        return attachments
    }

    /**
     * Get all of the cards on a given list
     * @param listId the list of cards to retrieve
     */
    def getCardsForList(listId) {
        def cards = trelloGet("/1/lists/${listId}/cards")
        return cards
    }


    /**
     * Make a PUT request to Trello
     * @param url - the API URL
     */
    def trelloPut(url) {
        def apiUrl = "https://api.trello.com${url}&key=${key}&token=${token}"        
        def result = HttpBuilder.configure { request.raw = apiUrl }.put()
        def object = [:] //(json && json != "") ? new JsonSlurper().parseText(result.text) : [:]
        return object
    }

    /**
     * Make a POST request to Trello
     * @param url - the API URL
     */
    def trelloPost(url) {
        def apiUrl = "https://api.trello.com${url}&key=${key}&token=${token}"
        def result = HttpBuilder.configure { request.raw = apiUrl }.post()
        def object = [:] //(json && json != "") ? new JsonSlurper().parseText(result.text) : [:]
        return object
    }

    /**
     * Make a get request to Trello
     * @param url - the API URL
     */
    def trelloGet(url) {
        def apiUrl = "https://api.trello.com${url}?key=${key}&token=${token}"
        def json = new URL(apiUrl).text
        def object = new JsonSlurper().parseText(json)
        return object
    }
}